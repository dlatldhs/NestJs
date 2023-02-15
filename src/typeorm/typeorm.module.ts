// typeorm-ex.module.ts

import { DynamicModule, Provider } from "@nestjs/common";
import { getDataSourceToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { TYPEORM_EX_CUSTOM_REPOSITORY } from "./typeorm.decorator";

export class TypeOrmExModule {
  public static forCustomRepository<T extends new (...args: any[]) => any>(repositories: T[]): DynamicModule { // any type recive and export repositories
    const providers: Provider[] = [];

    for (const repository of repositories) {
      const entity = Reflect.getMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, repository); // Reflect가 약간 인터셉터 하는 느낌(도중에 가져옴)

      if (!entity) {
        continue;
      }

      providers.push({
        inject: [getDataSourceToken()], // make use of inject(getDataSourceToken) and connect db
        provide: repository, // repository 제공
        useFactory: (dataSource: DataSource): typeof repository => { // 공급자를 동적으로 생성가능
          const baseRepository = dataSource.getRepository<any>(entity);
          return new repository(baseRepository.target, baseRepository.manager, baseRepository.queryRunner);
        },
      });
    }

    return {
      exports: providers,
      module: TypeOrmExModule,
      providers,
    };
  }
}