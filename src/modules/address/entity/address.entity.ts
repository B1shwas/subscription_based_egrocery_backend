import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AddressCategory, AddressType } from '../enum/addrees-type.enum';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Address extends BaseEntity {
  @Column()
  province: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @Column({ type: 'enum', enum: AddressType, default: AddressType.BILLING })
  addressType: AddressType;

  @Column({ nullable: true })
  postalCode?: string;

  @Column({
    type: 'enum',
    enum: AddressCategory,
    default: AddressCategory.HOME,
  })
  addressCategory: AddressCategory;
}
