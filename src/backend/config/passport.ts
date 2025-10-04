import { PassportStatic } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import prisma from './database';

export const configurePassport = (passport: PassportStatic) => {
  // Google OAuth Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            let user = await prisma.user.findUnique({
              where: { googleId: profile.id },
            });

            if (!user) {
              user = await prisma.user.create({
                data: {
                  googleId: profile.id,
                  email: profile.emails?.[0]?.value || '',
                  username: profile.displayName?.replace(/\s+/g, '_').toLowerCase() || `user_${profile.id}`,
                  firstName: profile.name?.givenName,
                  lastName: profile.name?.familyName,
                  avatar: profile.photos?.[0]?.value,
                  emailVerified: true,
                },
              });
            }

            return done(null, user);
          } catch (error) {
            return done(error as Error);
          }
        }
      )
    );
  }

  // GitHub OAuth Strategy
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: process.env.GITHUB_CALLBACK_URL || '/api/auth/github/callback',
        },
        async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
          try {
            let user = await prisma.user.findUnique({
              where: { githubId: profile.id },
            });

            if (!user) {
              user = await prisma.user.create({
                data: {
                  githubId: profile.id,
                  email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
                  username: profile.username || `user_${profile.id}`,
                  firstName: profile.displayName,
                  avatar: profile.photos?.[0]?.value,
                  githubUrl: profile.profileUrl,
                  emailVerified: true,
                },
              });
            }

            return done(null, user);
          } catch (error) {
            return done(error as Error);
          }
        }
      )
    );
  }

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
