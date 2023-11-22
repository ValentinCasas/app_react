import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function RadioGroupCategory({ categories, selectedCategoryId, onCategoryChange }) {

    const handleCategoryChange = (categoryId) => {
        console.log("------------------------")
        console.log(categoryId)
        console.log("------------------------")
        onCategoryChange && onCategoryChange(categoryId);

    };

    return (
        <RadioGroup value={selectedCategoryId} onChange={handleCategoryChange}>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                {categories.map((category) => (
                    <RadioGroup.Option
                        key={category.id}
                        value={category.id}
                        className={({ checked, active }) =>
                            classNames(
                                checked ? 'border-transparent' : 'border-gray-300',
                                active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                        }
                    >
                        {({ checked, active }) => (
                            <>
                                <RadioGroup.Label as="span" className="flex flex-1">
                                    <span className="flex flex-col">
                                        <span className="block text-sm font-medium text-gray-900">{category.name}</span>
                                        <span className="mt-1 flex items-center text-sm text-gray-500">{category.description}</span>
                                    </span>
                                </RadioGroup.Label>
                                <CheckCircleIcon
                                    className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                                    aria-hidden="true"
                                />
                                <span
                                    className={classNames(
                                        active ? 'border' : 'border-2',
                                        checked ? 'border-indigo-500' : 'border-transparent',
                                        'pointer-events-none absolute -inset-px rounded-lg'
                                    )}
                                    aria-hidden="true"
                                />
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
}

export default RadioGroupCategory;
