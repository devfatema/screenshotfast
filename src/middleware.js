import { NextResponse } from 'next/server';
import { jwtVerify, SignJWT } from 'jose';

export async function middleware(req) {
    const res = NextResponse.next();
    
    const protectedPaths = ['/dashboard', '/profile', '/settings', '/pro'];
    const authPaths = ['/login', '/register'];
  
    if (protectedPaths.includes(req.nextUrl.pathname) || authPaths.includes(req.nextUrl.pathname)) {
        const session = req.cookies.get(process.env.NEXT_PUBLIC_APP_NAME)?.value;
    
        if (!session && protectedPaths.includes(req.nextUrl.pathname)) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        
        if (session && authPaths.includes(req.nextUrl.pathname)) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
        
        if (session) {
            try {
                const secret = new TextEncoder().encode(process.env.JWT_SECRET);
                const { payload } = await jwtVerify(session, secret);
                
                const currentTime = Math.floor(Date.now() / 1000);
                const tokenLifetime = payload.exp - payload.iat;
                const tokenAge = currentTime - payload.iat;

                // Refresh when 75% of the token's lifetime has passed
                if (tokenAge > tokenLifetime * 0.75) {
                    const newToken = await refreshToken(payload);
                    
                    res.cookies.set(process.env.NEXT_PUBLIC_APP_NAME, newToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                    });
                } else if (currentTime >= payload.exp) {
                    return NextResponse.redirect(new URL('/login', req.url));
                }
            } catch (error) {
                console.error('Error verifying session token:', error);
                return NextResponse.redirect(new URL('/login', req.url));
            }
        }
    }
  
    return res;
}

async function refreshToken(payload) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const newToken = await new SignJWT({...payload, iat: Math.floor(Date.now() / 1000)})
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('30m') // Set token lifetime to 30 minutes
        .sign(secret);
    return newToken;
}
