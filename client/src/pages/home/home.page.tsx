import { Roboto } from 'next/font/google';
import { Button } from 'antd';

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });

export function Home() {
    return (
        <main className={roboto.className}>
            <h1>Hello World!</h1>
            <Button type="primary">Send</Button>
        </main>
    );
}
