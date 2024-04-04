import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faHourglass, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { Order, OrderStatus } from "../../../data/dataTypes.ts";
import { Trans, useTranslation } from "react-i18next";

export default function ComponentHomeStatus() {
    const { t } = useTranslation();

    const order: Order = {
        id: 0,
        items: [],
        totalPrice: 0,
        number: "013",
        status: OrderStatus.ready,
        createdTime: "",
        contactName: "",
        contactRoom: ""
    };
    return (
        <div className='p-5 bg-white rounded-3xl shadow-md w-full'>
            <div className='flex items-center'>
                <div className='flex-grow mr-3'>
                    <p className='text-xs text-gray-400'>
                        {t('home.currentOrderCard.name')}
                    </p>
                    <p className='text-3xl font-display font-bold'>
                        {order.number}
                    </p>
                    <p className='text-xs'>
                        <Trans i18nKey={'home.currentOrderCard.' + order.status} count={5}>
                            A <strong>B</strong>
                        </Trans>
                    </p>
                </div>
                <div className='flex-shrink'>
                    {
                        new Map<OrderStatus, JSX.Element>([
                            [OrderStatus.ready,
                                <FontAwesomeIcon icon={faCircleCheck} className='text-5xl text-green-400' />],
                            [OrderStatus.inProgress,
                                <FontAwesomeIcon icon={faHourglassHalf} className='text-5xl text-accent-orange' />],
                            [OrderStatus.notStarted,
                                <FontAwesomeIcon icon={faHourglass} className='text-5xl text-accent-orange' />]
                        ]).get(order.status)
                    }
                </div>
            </div>
        </div>
    );
}
