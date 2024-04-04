import mobileDeco from './assets/mobile-decoration.webp';
import ComponentPickupButton from "./ComponentPickupButton.tsx";
import ComponentCheckButton from "./ComponentCheckButton.tsx";
import ComponentHomeStatus from "./ComponentHomeStatus.tsx";

export default function PageHome() {
    return (
        <div>
            <div className='top-0 left-0 absolute h-[50vh] bg-cover -z-10 w-full'
                 style={{ backgroundImage: `url(${mobileDeco})` }}></div>
            <div className='w-full px-3 translate-y-[40vh] flex justify-center items-center flex-col'>
                <div
                    className='grid grid-cols-2 grid-rows-1 place-content-center w-full bg-white rounded-3xl shadow-xl p-8 mb-5'>
                    <ComponentPickupButton />
                    <ComponentCheckButton />
                </div>

                <ComponentHomeStatus />
            </div>
        </div>
    );
}
