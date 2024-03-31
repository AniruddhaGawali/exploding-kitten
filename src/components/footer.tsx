/* eslint-disable @next/next/no-img-element */
import React from 'react';

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="w-full bg-secondary border-t h-20">
      <div className="container mx-auto flex items-center justify-between h-full">
        <p>© 2024 Exploding Kitten</p>
        <p className="flex items-center justify-center gap-3 text-sm font-bold">
          Made with ❤️ by
          <img
            src="https://media.tenor.com/BizS5xQKfbcAAAAi/banana-cat-banana-cat-running.gif"
            alt="banana cat"
            className="w-5"
          />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
