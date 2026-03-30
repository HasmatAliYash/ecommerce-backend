import { AppDataSource } from "../../config/data-source";
import { Product } from "./product.entity";
import { Like } from "typeorm";

const repo = AppDataSource.getRepository(Product);

export class CatalogService {
  async create(data: Partial<Product>) {
    const product = repo.create(data);
    return repo.save(product);
  }

  async getAll() {
    return repo.find();
  }

  async getById(id: string) {
    const product = await repo.findOneBy({ id });
    if (!product) throw new Error("Item not found");
    return product;
  }

  async update(id: string, data: Partial<Product>) {
    const product = await this.getById(id);
    Object.assign(product, data);
    return repo.save(product);
  }

  async delete(id: string) {
    const product = await this.getById(id);
    await repo.remove(product);
    return { message: "Item removed" };
  }

  async search(query: string) {
    return repo.find({
      where: [
        { name: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },
      ],
    });
  }

  async uploadImage(id: string, imageUrl: string) {
    const product = await this.getById(id);
    product.imageUrl = imageUrl;
    return repo.save(product);
  }
}
