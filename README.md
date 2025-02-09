A modern, feature-rich project management dashboard built with Next.js, React, and TypeScript. Manage projects, objectives, tasks, and time entries with an intuitive user interface.

## Features

- **Project Management**: Create and track projects with detailed information including status, timelines, and estimated hours
- **Objectives Tracking**: Break down projects into manageable objectives
- **Task Management**: Create, assign, and track tasks with priorities and status updates
- **Time Tracking**: Log and monitor time spent on tasks
- **Todo Lists**: Organize tasks into customizable todo lists
- **Timeline View**: Visualize project progress and activity in a chronological timeline
- **Quick Add Functionality**: Rapidly add new projects, objectives, tasks, and time entries
- **Built-in Notepad**: Take notes and save them locally

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Components**: 
  - Custom components built with Tailwind CSS
  - shadcn/ui components
  - Lucide React icons
- **State Management**: React Hooks
- **Database**: Prisma with your preferred database
- **Styling**: Tailwind CSS with custom theme

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Database (PostgreSQL recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/project-name.git
cd project-name
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up your environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your database and other configuration details.

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/               # Next.js app router pages
├── components/        # React components
│   ├── dashboard/     # Dashboard-specific components
│   ├── dialogs/      # Dialog components
│   ├── forms/        # Form components
│   └── ui/           # Generic UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and API clients
├── types/            # TypeScript type definitions
└── constants/        # Constants and configuration
```

## API Routes

The application includes RESTful API routes for:
- Projects
- Objectives
- Tasks
- Time Entries
- Todo Lists

All API routes are located in `src/app/api/`.

## Key Components

- **DashboardLayout**: Main dashboard interface with statistics and overview
- **QuickAdd Dialogs**: Modular dialog system for rapid data entry
- **FormDialog**: Reusable form dialog component
- **Timeline**: Activity timeline visualization
- **Notepad**: Built-in note-taking functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Lucide](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework

## Screenshots

[Add screenshots of your application here]

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/project-name](https://github.com/yourusername/project-name)