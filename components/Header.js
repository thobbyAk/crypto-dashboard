import React, { useState, Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
	Bars3BottomLeftIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import { GlobalContext } from "../context/GlobalState";
import { shortenAddress } from "../lib/utils";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Header = ({
	account,
	walletConnected,
	connectWallet,
	disconnectWallet,
}) => {
	const { user } = useContext(GlobalContext);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-gray-800 shadow">
			<button
				type="button"
				className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
				onClick={() => setSidebarOpen(true)}
			>
				<span className="sr-only">Open sidebar</span>
				<Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
			</button>
			<div className="flex flex-1 justify-between px-4">
				<div className="flex flex-1"></div>
				<div className="ml-4 flex items-center md:ml-6">
					{/* Profile dropdown */}
					{walletConnected ? (
						<>
							<button
								type="button"
								className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
							>
								{shortenAddress(account)}
							</button>
							<Menu as="div" className="relative ml-3">
								<div>
									<Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
										<span className="sr-only">Open user menu</span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="w-6 h-6"
										>
											<path
												fillRule="evenodd"
												d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
												clipRule="evenodd"
											/>
										</svg>
									</Menu.Button>
								</div>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<Menu.Item>
											{({ active }) => (
												<>
													<a
														href={`https://etherscan.io/address/${account}`}
														className={classNames(
															active ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm text-gray-700"
														)}
													>
														View on Etherscan
													</a>
													<a
														onClick={() => disconnectWallet()}
														className={classNames(
															active ? "bg-gray-100" : "",
															"block px-4 py-2 text-sm cursor-pointer text-gray-700"
														)}
													>
														Disconnect Wallet
													</a>
												</>
											)}
										</Menu.Item>
									</Menu.Items>
								</Transition>
							</Menu>
						</>
					) : (
						<button
							onClick={() => {
								connectWallet();
							}}
							type="button"
							className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
						>
							Connet Wallet
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
