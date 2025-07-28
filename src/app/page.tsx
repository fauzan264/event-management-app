import Image from "next/image";

export default function Home() {
    return (
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <div className="carousel w-full mt-10">
                <div
                    id="slide1"
                    className="carousel-item relative w-full h-[75vh]"
                >
                    <Image
                        src="/RunningEvent.png"
                        alt="RunningEvent"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide2" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>

                <div
                    id="slide2"
                    className="carousel-item relative w-full h-[75vh]"
                >
                    <Image
                        src="/MusicEvent.png"
                        alt="MusicEvent"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide3" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
