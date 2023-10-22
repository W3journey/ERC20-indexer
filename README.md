# ERC-20 Indexer - ERC-20 Indexer Application

ERC-20 Indexer is an app that uses Alchemy SDK in order to display all of an address's ERC-20 token balances.
It supports Ethereum mainnet and Arbitrum One.
Ens is supported on Ethereum mainnet.
It also has a `Portfolio` page where users can connect their wallet and view their own tokens.
Users can select one or multiple tokens and report them as spam.
Tokens reported as spam will be stored in a Supabase db, and will be hidden for anyone in the future.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Supabase](https://supabase.com/)
- [Alchemy SDK](https://www.alchemy.com/sdk)
- [RainbowKit](https://www.rainbowkit.com/)
- [wagmi](https://wagmi.sh/)
- [viem](https://viem.sh/)
- [Zod](https://zod.dev/)
- [Sonner](https://sonner.emilkowal.ski/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository `git clone https://github.com/W3journey/ERC20-indexer`

2. Run `npm install`.

3. Set up environment variables: See .env.example

4. Run the development server: `npm run dev`

5. Open your browser and go to: `http://localhost:3000`

## License

[ERC-20 Indexer](https://github.com/W3journey/ERC20-indexer) is open-source and released under the [MIT License].

## Acknowledgements

- This project was inspired by the Alchemy University lesson.
- Thanks to the creators and maintainers of the libraries and tools used in this project.

## Contact

If you have any questions or need further information, feel free to contact [web3journey@proton.me].
