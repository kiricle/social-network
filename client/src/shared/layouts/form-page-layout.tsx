import type { NextFont } from 'next/dist/compiled/@next/font';
import { ReactNode } from 'react';
import { Logo } from '../Logo/Logo';

export function FormPageLayout({
    title,
    form,
    font,
}: {
    font: NextFont;
    title: string;
    form: ReactNode;
}) {
    return (
        <main className={font.className + ''}>
            <section className='flex flex-row rounded-sm shadow-lg'>
                <div className='bg-green-500 p-4 text-white'>
                    <Logo />
                    <p className='my-8 text-lg'>Connect with other people</p>
                </div>
                <div className='bg-white p-4'>
                    <h1>{title}</h1>
                    <div>{form}</div>
                </div>
            </section>
        </main>
    );
}
