import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Repository } from "typeorm";
import { UpdateNameDto } from "./user.dto";
import { User } from "@/migrations/user.entity";

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async updateName(body: UpdateNameDto, req: Request): Promise<User> {
    const user: User = <User>req.user;
    user.name = body.name;
    return this.repository.save(user);
  }
}
