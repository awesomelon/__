// core
import { Injectable } from '@nestjs/common';

// Heart
import { Heart } from './entity';
import { HeartDTO, RequestChargingHeartDTO, RequestUseHeartDTO } from './dto';
import { HeartItemService } from './heartItem.service';

// Bonus
import { BonusHeartService } from 'src/bonusHeart/bonusHeart.service';

// common
import { CommonService } from 'src/common/service/common.service';
import { errorException } from 'src/common/middleware';

// history
import { HistoryService } from 'src/history/history.service';
import { HistoryDTO } from 'src/history/dto';

@Injectable()
export class HeartService {
  constructor(
    private readonly commonService: CommonService<Heart>,
    private readonly heartItemService: HeartItemService,
    private readonly historyService: HistoryService,
    private readonly bonusHeartService: BonusHeartService,
  ) {}

  async charging(dto: RequestChargingHeartDTO, userId: number) {
    this.validateChargingAmount(dto.amount);

    const heart = await this.findUserHeart(userId);
    return heart
      ? await this.updateExistingHeart(heart, dto)
      : await this.createHeart(userId, dto);
  }

  private validateChargingAmount(amount: number): void {
    if (amount <= 0) {
      errorException('TF441');
    }

    if (!Number.isInteger(amount)) {
      errorException('TF440');
    }
  }

  private async findUserHeart(userId: number): Promise<Heart | null> {
    return this.commonService.findOne({
      where: { userId, isDeleted: false },
    });
  }

  private async updateExistingHeart(
    heart: Heart,
    dto: RequestChargingHeartDTO,
  ): Promise<Heart> {
    await this.heartItemService.insert({
      heartId: heart.id,
      amount: dto.amount,
    });
    await this.logHistory({
      ...dto,
      userId: heart.userId,
      isUse: false,
      type: 'heart',
    });

    return this.commonService.findOne({ where: { id: heart.id } });
  }

  private async createHeart(
    userId: number,
    dto: RequestChargingHeartDTO,
  ): Promise<Heart> {
    const newHeart = await this.insert({ userId });
    await this.heartItemService.insert({
      heartId: newHeart.id,
      amount: dto.amount,
    });
    await this.logHistory({
      ...dto,
      isUse: false,
      userId,
      type: 'heart',
    });
    return this.commonService.findOne({ where: { id: newHeart.id } });
  }

  async use(dto: RequestUseHeartDTO, userId: number) {
    await this.validateUseAmount(dto.amount, userId);

    const { useBonusHeart, useHeart } = await this.calculateHeartUsage(
      dto.amount,
      userId,
    );

    await this.processBonusHeartUsage(useBonusHeart, dto, userId);

    if (useHeart > 0) {
      await this.processHeartUsage(useHeart, dto, userId);
    }

    return this.getTotalHeartAmount(userId);
  }

  private async validateUseAmount(amount: number, userId: number) {
    if (amount <= 0) {
      errorException('TF445');
    }

    if (!Number.isInteger(amount)) {
      errorException('TF446');
    }

    const { totalAmount } = await this.getTotalHeartAmount(userId);
    if (totalAmount < amount) {
      errorException('TF444');
    }
  }

  private async calculateHeartUsage(
    amount: number,
    userId: number,
  ): Promise<{ useBonusHeart: number; useHeart: number }> {
    const bonusHeartAmount =
      await this.bonusHeartService.getTotalBonusHeartAmount(userId);
    const useBonusHeart =
      bonusHeartAmount >= amount ? amount : bonusHeartAmount;
    const useHeart = amount - useBonusHeart;

    return { useBonusHeart, useHeart };
  }

  private async processBonusHeartUsage(
    amount: number,
    dto: RequestUseHeartDTO,
    userId: number,
  ): Promise<void> {
    if (amount > 0) {
      await this.bonusHeartService.use({ ...dto, amount, userId });
      await this.logHistory({
        ...dto,
        isUse: true,
        amount,
        type: 'bonusHeart',
        userId,
      });
    }
  }

  private async processHeartUsage(
    amount: number,
    dto: RequestUseHeartDTO,
    userId: number,
  ): Promise<void> {
    const heart = await this.findUserHeart(userId);
    if (heart) {
      await this.heartItemService.insert({
        heartId: heart.id,
        amount: -amount,
      });
      await this.logHistory({
        ...dto,
        isUse: true,
        amount,
        type: 'heart',
        userId,
      });
    }
  }

  async getTotalHeartAmount(userId: number) {
    const heartAmount = await this.getHeartAmount(userId);
    const bonusHeartAmount =
      await this.bonusHeartService.getTotalBonusHeartAmount(userId);

    return {
      totalAmount: heartAmount + bonusHeartAmount,
    };
  }

  async getHeartAmount(userId: number) {
    const heart = await this.commonService.findOne({
      where: { userId },
      relations: ['heartItems'],
    });

    if (!heart) {
      return 0;
    }

    const totalAmount = heart.heartItems.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);

    return totalAmount;
  }

  async insert(dto: HeartDTO) {
    const entity = new Heart();
    Object.assign(entity, dto);

    return this.commonService.insert(entity);
  }

  private async logHistory(data: HistoryDTO): Promise<void> {
    await this.historyService.insert(data);
  }
}
