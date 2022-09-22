import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { range } from "../lib/utils";

const Pagination = ({ currentPage, total, limit, onPageChange }) => {
	const pagesCount = Math.ceil(total / limit);
	const pages = range(1, pagesCount);
	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};
	return (
		<div className="flex items-center justify-between border-t border-gray-200 bg-dark px-4 py-3 sm:px-6">
			<div className="flex flex-1 justify-between sm:hidden">
				<a
					onClick={onPrevious}
					className="relative cursor-pointer  inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					Previous
				</a>
				<a
					onClick={onNext}
					className="relative cursor-pointer  ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					Next
				</a>
			</div>
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-gray-200">
						Showing <span className="font-medium">1</span> to{" "}
						<span className="font-medium">{limit}</span> of{" "}
						<span className="font-medium">{total}</span> results
					</p>
				</div>
				<div>
					<nav
						className="isolate inline-flex -space-x-px rounded-md shadow-sm"
						aria-label="Pagination"
					>
						<a
							onClick={onPrevious}
							className="relative cursor-pointer  inline-flex items-center rounded-l-md border border-gray-300 bg-dark px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
						>
							<span className="sr-only">Previous</span>
							<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
						</a>
						{/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
						{pages.map((page, index) => (
							<a
								key={index}
								aria-current="page"
								onClick={() => onPageChange(page)}
								className={
									currentPage == page
										? `relative cursor-pointer  z-10 inline-flex items-center border border-gray-300   px-4 py-2 text-sm font-medium text-cyan-600 focus:z-20`
										: `relative cursor-pointer  z-10 inline-flex items-center border border-gray-300   px-4 py-2 text-sm font-medium text-gray-200 focus:z-20`
								}
							>
								{page}
							</a>
						))}

						<a
							onClick={onNext}
							className="relative  cursor-pointer inline-flex items-center rounded-r-md border border-gray-300 bg-dark px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
						>
							<span className="sr-only">Next</span>
							<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
						</a>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Pagination;
