import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

export default function ComponentPickupButton() {
    const { t } = useTranslation();

    return (
        <button className='flex justify-center items-center flex-col rounded-2xl px-3 py-5 bg-white
                            hover:bg-gray-50 transition-colors duration-100'>
            <FontAwesomeIcon icon={faMugHot} className='text-accent-red mb-3 text-5xl' />

            <p className='font-bold text-xl font-display mb-0.5'>
                {t('home.pickUp.name')}
            </p>

            <p className='text-gray-400 text-xs'>
                {t('home.pickUp.description')}
            </p>
        </button>
    );
}
