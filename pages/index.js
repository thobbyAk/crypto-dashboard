import Link from "next/link";
import react, { useContext, useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { GlobalContext } from "../context/GlobalState";
import { currencyFormat, currencyFormatToAbs, round } from "../lib/utils";

export default function Home() {
	const { marketData, addUser, users } = useContext(GlobalContext);
	const [currentPage, setCurrentPage] = useState(1);
	const [dataPerPage] = useState(10);

	// Get current Data
	const indexOfLastData = currentPage * dataPerPage;
	const indexOfFirstData = indexOfLastData - dataPerPage;
	const currentData = marketData.slice(indexOfFirstData, indexOfLastData);

	return (
		<div className="py-6">
			<div className="mx-auto max-w-7xl px-4 ">
				<div className="sm:flex sm:items-center mt-8">
					<div className="sm:flex-auto">
						<h1 className="text-xl font-semibold text-white">
							Cryptocurrency Prices by Market Cap
						</h1>
					</div>
					<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
				</div>
				<div className="mt-2 flex flex-col">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								<table className="min-w-full divide-y divide-gray-300">
									<thead className="bg-dark-50">
										<tr>
											<th
												scope="col"
												className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6"
											>
												#
											</th>
											<th
												scope="col"
												className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6"
											>
												Coin
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
											>
												Price
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
											>
												24h
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
											>
												24h Volume
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300"
											>
												Market Cap
											</th>
											{/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th> */}
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200 bg-dark">
										{currentData.map((data) => (
											<Link key={data.id} href={`/coin/${data.id}`} passHref>
												<tr className="cursor-pointer hover:bg-neutral-800">
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
														<div className="text-gray-300">
															{" "}
															&nbsp; &nbsp;{data?.market_cap_rank}
														</div>
													</td>
													<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
														<div className="flex items-center">
															<div className="h-10 w-10 flex-shrink-0">
																<img
																	className="h-10 w-10 rounded-full"
																	src={data.image}
																	alt=""
																/>
															</div>
															<div className="ml-4">
																<div className="font-medium text-gray-300">{data.name}</div>
																<div className="text-gray-200">{data.symbol.toUpperCase()}</div>
															</div>
														</div>
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
														<div className="text-gray-300">
															{currencyFormat(data?.current_price)}
														</div>
													</td>

													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
														{data.market_cap_change_percentage_24h > 0 ? (
															<span className="inline-flex  bpx-2 text-xs font-semibold leading-5 text-green-800">
																{round(data.market_cap_change_percentage_24h)}%
															</span>
														) : (
															<span className="inline-flex  bpx-2 text-xs font-semibold leading-5 text-red-800">
																{round(data.market_cap_change_percentage_24h)}%
															</span>
														)}
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
														<div className="text-gray-300">
															{currencyFormatToAbs(data?.total_volume)}
														</div>
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
														<div className="text-gray-300">
															{currencyFormatToAbs(data?.market_cap)}
														</div>
													</td>
												</tr>
											</Link>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<Pagination
					currentPage={currentPage}
					total={marketData.length}
					limit={10}
					onPageChange={(page) => {
						setCurrentPage(page);
					}}
				/>
			</div>
		</div>
	);
}
