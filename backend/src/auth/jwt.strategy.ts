import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // Import your UsersService
import { UserPayload } from 'src/models/user.models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Set to true if you want to allow expired tokens (not recommended for most cases)
      secretOrKey: process.env.JWT_SECRET || 'your_secret_key', // MUST match the secret used in JwtModule.register
    });
  }

  async validate(payload: UserPayload) {
    console.log('JWT PAYLOAD:', payload);
    // This 'payload' is the decoded JWT payload
    // You can fetch the user from your database here using payload.sub (user ID)
    // or return the payload directly if all necessary user info is in the token.
    const user = await this.usersService.findOne(payload.sub); // Assuming findById exists and fetches the user
    if (!user) {
      throw new UnauthorizedException();
      // This should ideally not happen if the token is valid and signed by you
      // and the user still exists in the DB.
      // You might throw an UnauthorizedException here if the user doesn't exist.
    }
    console.log(user);
    return {
      userId: payload.sub,
      username: payload.username,
    }; // This object will be attached to req.user
  }
}
