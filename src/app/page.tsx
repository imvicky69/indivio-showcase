
import './globals.css';
import Button from '../../components/ui/Button'; 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h1 className="text-5xl font-bold">
        Welcome to the Indivio Application!
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-600">
        Your gateway to immersive virtual reality experiences. We handle the tech,
        so you can focus on building your business.
      </p>
      <div className="mt-8 flex gap-4">
        <Button>Book a Demo</Button>
        <Button className="bg-gray-800 hover:bg-gray-900">
          View Pricing
        </Button>
      </div>
    </main>
  );
}