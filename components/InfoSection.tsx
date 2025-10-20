import React from 'react';
import { GiftIcon } from './icons/GiftIcon';
import { UsersIcon } from './icons/UsersIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';

const InfoSection: React.FC = () => {
  const infoCards = [
    {
      icon: <GiftIcon className="h-10 w-10 mx-auto text-blue-500 mb-4" />,
      title: 'So, why is it free?',
      text: "I get it. When you're a solo dev or a small team, every penny counts. Pricey email validation services can be a real budget-killer, so I built this tool to give back to the community. It's totally free and open-source. No strings attached.",
    },
    {
      icon: <UsersIcon className="h-10 w-10 mx-auto text-blue-500 mb-4" />,
      title: 'For the Community',
      text: 'This is a passion project, built by one dev for others. No corporate agenda here, just a simple tool to help people build cool stuff without breaking the bank.',
    },
    {
      icon: <LockClosedIcon className="h-10 w-10 mx-auto text-blue-500 mb-4" />,
      title: 'Your Privacy Matters',
      text: "Your emails are your business, not mine. We process them on the fly and don't store anything. Period. Your data is never saved, seen, or shared.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto my-16 text-center">
      <div className="grid md:grid-cols-3 gap-8">
        {infoCards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center"
          >
            {card.icon}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {card.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
