import { injectable, unmanaged } from 'inversify';
import { PrismaClient, Prisma } from '@prisma/client';

/**
 * This Repository class is the base repository. It is an abstract class because it can only be
 * extended. This class is written to support Prisma properly.
 */
@injectable()
export default abstract class Repository<T> {
  protected readonly prisma: PrismaClient;
  protected readonly model: any;

  constructor(@unmanaged() modelName: keyof PrismaClient) {
    this.prisma = new PrismaClient();
    this.model = this.prisma[modelName];
  }

  public async findOne(
    filter: Prisma.Prisma__PickSubset<T, any>,
  ): Promise<T | null> {
    const doc = await this.model.findUnique({
      where: filter,
    });
    return doc;
  }

  public async find(
    filter: Prisma.Prisma__PickSubset<T, any>,
  ): Promise<T[]> {
    const docs = await this.model.findMany({
      where: filter,
    });
    return docs;
  }

  public async findById(id: string): Promise<T | null> {
    const doc = await this.model.findUnique({
      where: { id },
    });
    return doc;
  }

  public async create(data: Partial<T>): Promise<T> {
    if (!data) {
      throw new Error('Empty object provided');
    }

    const newDoc = await this.model.create({
      data,
    });

    return newDoc;
  }

  public async removeMany(filter: Prisma.Prisma__PickSubset<T, any>) {
    await this.model.deleteMany({
      where: filter,
    });
  }

  public async dropIndexes() {
    // Prisma does not support dropping indexes directly through the client.
    // You would need to manage indexes via migrations or database-specific SQL commands.
  }
}
