import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles, User, UserDocument } from './entities/user.entity';
//import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Collection, Db, ObjectId } from 'mongodb';
import { InjectDB } from 'src/database/injectDatabase.decorator';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  private userModel: Collection<UserDocument>;
  constructor(
    @InjectDB() private readonly db: Db,
    private jwtService: JwtService,
  ) {
    this.userModel = this.db.collection('Users');
  }

  //Get all users
  async getAllUsers() {
    return await this.userModel.find().toArray();
  }

  //creat new user
  async createUser(createUserDto: CreateUserDto) {
    console.log('first', createUserDto);
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new Error('User exist');
    }
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    console.log('salf', createUserDto);
    if (!createUserDto) {
      throw new Error('User is undefined');
    }
    const result = await this.userModel.insertOne({
      ...createUserDto,
      role: Roles.Viewer,
    });
    console.log(result);
    if (!result) {
      throw new Error('Not create user 👎');
    }
    return 'User created successfully 👍';
  }

  //Get user by Id
  async getUserById(id: ObjectId) {
    if (!id) {
      throw new Error('IdUser is undefined');
    }
    try {
      const idUser = { _id: new ObjectId(id) };
      const user = (await this.userModel.findOne(idUser)) as User;
      if (user) {
        return user;
      }
    } catch (error) {
      throw new Error(`Can not find user with id: ${id}`);
    }
  }

  //Update user
  async updateUser(id: ObjectId, updateUserDto: UpdateUserDto) {
    //const user = updateUserDto;
    if (!id || !updateUserDto) {
      throw new Error('User/Id is undefined');
    }
    const idUser = { _id: new ObjectId(id) };
    const result = await this.userModel.updateOne(idUser, {
      $set: { ...updateUserDto },
    });
    console.log(idUser, updateUserDto);
    if (!result) {
      throw new Error('Not update user 👎');
    }
    return 'User update successfully 👍';
  }

  //Delete user
  async deleteUser(id: ObjectId) {
    if (!id) {
      throw new Error('IdUser is undefined');
    }
    const idUser = { _id: new ObjectId(id) };
    const result = await this.userModel.deleteOne(idUser);
    if (!result) {
      throw new Error('Not delete user 👎');
    }
    return 'User delete successfully 👍';
  }

  //Creating JWT token for User
  async CreatJWT(loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    const { email, password } = loginUserDto;
    let existingUser;
    try {
      existingUser = await this.userModel.findOne({ email: email });
    } catch {
      throw new Error('There is no user from the above details');
    }
    const validPassword = await bcrypt.compare(
      password,
      existingUser!.password,
    );
    console.log(validPassword);
    if (!existingUser || !validPassword) {
      throw new Error('Error in identification details');
    }
    let token;
    console.log(existingUser);
    try {
      token = this.jwtService.sign(
        {
          userId: existingUser._id,
          email: existingUser.email,
          userName: existingUser.userName,
          role: existingUser.role,
        },
        //process.env.SECRET_KEY!,
        //'secretkeyappearshere',
        //{ expiresIn: '1h' },
      );
      console.log(token);
    } catch (err) {
      throw new Error('Error! Something went wrong.');
    }
    return {
      success: true,
      data: {
        token: token,
      },
    };
  }

  // updateUsers
  async updateUsersService(updateUserDto: UpdateUserDto) {
    const updateRoleUsers = updateUserDto.updateRoleUsers;
    try {
      const updated = updateRoleUsers.map((user) => ({
        updateOne: {
          filter: { _id: new ObjectId(user._id) },
          update: { $set: { role: user.role } },
        },
      }));

      this.userModel.bulkWrite([...updated]);
    } catch (error) {}
  }
}
