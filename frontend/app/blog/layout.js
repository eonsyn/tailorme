import './blogs.css'


export const metadata = {
title: 'Next Blog',
description: 'Medium-style blog built with Next.js and TipTap'
}


export default function RootLayout({ children }) {
return (
<html lang="en">
<body>
<header className="site-header">
<div className="container">
<h1><a href="/">Next Blog</a></h1>
<nav>
<a href="/editor">Write</a>
</nav>
</div>
</header>
<main className="container">{children}</main>
</body>
</html>
);
}