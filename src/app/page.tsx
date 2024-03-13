import Head from "next/head";
import ChessBoard from "@/components/ChessBoard";
import LogoCard from "@/components/LogoCard";

export default function Home() {
  return (
    <div>
      <main>
        <div className="relative">
          <ChessBoard />
          <div className="absolute inset-0 bg-gray-300 bg-opacity-20">
            <LogoCard />
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="flex h-screen bg-gray-900">
            <div className="flex-grow bg-white px-8 py-16">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-6">
                  <h2 className="text-3xl font-bold mb-4">Header</h2>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas aliquam, risus quis porta consequat, leo odio
                    dapibus quam, non consectetur magna lorem vitae urna.
                    Vivamus magna arcu, semper at consectetur vitae, faucibus
                    vel lorem. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Maecenas aliquam, risus quis porta
                    consequat, leo odio dapibus quam, non consectetur magna
                    lorem vitae urna. Vivamus magna arcu, semper at consectetur
                    vitae, faucibus vel lorem. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Maecenas aliquam, risus quis
                    porta consequat, leo odio dapibus quam, non consectetur
                    magna lorem vitae urna. Vivamus magna arcu, semper at
                    consectetur vitae, faucibus vel lorem. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Maecenas aliquam, risus
                    quis porta consequat, leo odio dapibus quam, non consectetur
                    magna lorem vitae urna. Vivamus magna arcu, semper at
                    consectetur vitae, faucibus vel lorem.
                  </p>
                </div>
                <div className="col-span-6">
                  <img
                    src="/assets/images/thinking.png"
                    alt="Image Description"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
