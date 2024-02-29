import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { ConfigService } from '@nestjs/config';
import { RegisterRequestDto, AuthenticateRequestDto } from './dto/index';



@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(private configService: ConfigService) {
    this.userPool = new CognitoUserPool({
      UserPoolId: 'sa-east-1_toyJ4hJeO',
      ClientId: '4jigajm44b29dl6ljdhsbj0261',
    });
  }

  async register(authRegisterRequest: RegisterRequestDto) {
    const { name, email, password } = authRegisterRequest;
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        name,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  async authenticate(user: AuthenticateRequestDto) {
    const { name, password } = user;
    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}