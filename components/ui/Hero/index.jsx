import NavLink from "../NavLink"
import GradientWrapper from "../../GradientWrapper"

const Hero = () => {


    return (
        <GradientWrapper>
            <section>
                <div className="custom-screen items-center gap-12 text-gray-600 flex flex-col sm:justify-center sm:text-center xl:flex-row xl:text-left">
                    <div className='flex-none space-y-5 max-w-4xl xl:max-w-2xl'>
                        <h1 className="text-4xl text-white font-extrabold sm:text-6xl">
                            Agar Assistant
                        </h1>
                        <p className="text-gray-300 max-w-xl sm:mx-auto xl:mx-0">
                        Empower Your Academic Journey with Agar Student Assistant                     
                        </p>
                        <div className="items-center gap-x-3 font-medium text-sm sm:flex sm:justify-center xl:justify-start">
                            <NavLink
                                href="/signup"
                                className="block text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700"
                                scroll={false}
                            >
                                Get started
                            </NavLink>
                        </div>
                    </div>
                    <div className="flex-1 w-full sm:max-w-2xl xl:max-w-xl">
                        <div className="relative">
                            {/* <Image src={heroThumbnail} className="rounded-lg w-full" alt="IO Academy" loading="lazy"/> */}
                        </div>
                    </div>
                </div>
            </section>
        </GradientWrapper>
    )
}

export default Hero