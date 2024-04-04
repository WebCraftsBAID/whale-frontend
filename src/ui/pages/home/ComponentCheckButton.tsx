import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function ComponentCheckButton() {
    const { t } = useTranslation();

    return (
        <button className='flex justify-center items-center flex-col rounded-3xl w-full h-full
                            px-3 py-5 bg-white hover:bg-gray-100 transition-colors duration-100'>
            <FontAwesomeIcon icon={faClock} className='text-accent-orange mb-3 text-5xl' />

            <p className='font-bold text-xl font-display mb-0.5'>
                {t('home.check.name')}
            </p>

            <p className='text-gray-400 text-xs'>
                {t('home.check.description')}
            </p>
        </button>
    );
}
