import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
        secretOrKeyProvider: passportJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 3,
          jwksUri: `https://cognito-idp.${configService.get(
            'sa-east-1',
          )}.amazonaws.com/${configService.get(
            'sa-east-1_toyJ4hJeO',
          )}/.well-known/jwks.json`,
        }),
  
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        audience: configService.get('sa-east-1_toyJ4hJeO'),
        issuer: `https://cognito-idp.${configService.get(
          'sa-east-1',
        )}.amazonaws.com/${configService.get('4jigajm44b29dl6ljdhsbj0261')}`,
        algorithms: ['RS256'],
    });
  }

  public async validate(payload: any) {
    return !!payload.email;
  }
}


// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { passportJwtSecret } from 'jwks-rsa';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly configService: ConfigService) {
//     super({
//       secretOrKeyProvider: passportJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 3,
//         jwksUri: `https://cognito-idp.${configService.get(
//           'sa-east-1',
//         )}.amazonaws.com/${configService.get(
//           'sa-east-1_toyJ4hJeO',
//         )}/.well-known/jwks.json`,
//       }),

//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       audience: configService.get('arn:aws:cognito-idp:sa-east-1:144550218611:userpool/sa-east-1_toyJ4hJeO'),
//       issuer: `https://cognito-idp.${configService.get(
//         'sa-east-1',
//       )}.amazonaws.com/${configService.get('AWS_COGNITO_USER_POOL_ID')}`,
//       algorithms: ['RS256'],
//     });
//   }

//   public async validate(payload: any) {
//     return !!payload.email;
//   }
// }