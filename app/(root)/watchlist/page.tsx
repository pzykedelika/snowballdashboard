import { getUserWatchlist } from '@/lib/actions/watchlist.actions';
import Link from 'next/link';
import WatchlistButton from '@/components/WatchlistButton';

export default async function WatchlistPage() {
  const result = await getUserWatchlist();

  if (!result.success || !result.data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Error Loading Watchlist</h1>
          <p className="text-gray-400">{result.error || 'Failed to load watchlist'}</p>
        </div>
      </div>
    );
  }

  const watchlist = result.data;

  if (watchlist.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="w-24 h-24 mx-auto text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.04 10.385a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Your Watchlist is Empty</h1>
          <p className="text-gray-400 mb-6">
            Start tracking stocks by adding them to your watchlist. Search for a stock and click the star icon to add it.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Explore Stocks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Watchlist</h1>
        <p className="text-gray-400">
          {watchlist.length} {watchlist.length === 1 ? 'stock' : 'stocks'} in your watchlist
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchlist.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <Link
                  href={`/stocks/${item.symbol}`}
                  className="text-xl font-bold hover:text-blue-400 transition-colors"
                >
                  {item.symbol}
                </Link>
                <p className="text-sm text-gray-400 mt-1">{item.company}</p>
              </div>
              <WatchlistButton
                symbol={item.symbol}
                company={item.company}
                isInWatchlist={true}
                type="icon"
              />
            </div>

            <div className="text-sm text-gray-500">
              Added {new Date(item.addedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>

            <Link
              href={`/stocks/${item.symbol}`}
              className="mt-4 block w-full text-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
