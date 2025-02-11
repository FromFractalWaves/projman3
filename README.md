# ProjMan3 Web UI

A modern, enterprise-grade project management dashboard built with Next.js, React, and TypeScript. Features a dark-themed UI with comprehensive project, task, and time management capabilities.

## Features

### Project Management
- Create and manage projects with detailed metadata
- Track project status, timelines, and estimated hours
- Monitor project progress and resource allocation
- Integrated timeline view for project milestones

### Task & Objective Management
- Break down projects into strategic objectives
- Create and assign tasks with priorities and deadlines
- Track task completion and progress
- Support for multiple task views (grid/list)
- Priority levels (low/medium/high) with visual indicators
- Task status workflow (todo → in-progress → done)

### Time Tracking
- Built-in time entry system for tasks
- Track time spent on specific tasks
- Generate time reports and summaries
- Automatic duration calculations

### Todo Lists
- Create and manage todo lists
- Assign tasks to todo lists
- Different list types (daily/weekly/monthly)
- Track completion status

### Advanced UI Features
- Dark theme optimized interface
- Grid and list view options for all entities
- Compact and detailed card variants
- Quick-add functionality for rapid data entry
- Responsive design for all screen sizes
- Interactive timeline visualization
- Real-time status indicators
- Card-based interface with sort/filter capabilities

## Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **State Management**: Zustand with persist middleware
- **UI Components**: 
  - Custom components with shadcn/ui
  - Tailwind CSS for styling
  - Lucide React icons
  - Recharts for data visualization

### Backend & Data
- **API**: Built-in Next.js API routes
- **Database**: Prisma ORM
- **Data Validation**: Built-in validation layer
- **File Handling**: Custom file system handlers

### Development Tools
- ESLint for code quality
- TypeScript for type safety
- Prettier for code formatting

## Project Structure

```
projman3-webui/
├── src/
│   ├── app/             # Next.js app router & API routes
│   ├── components/      # React components
│   │   ├── cards/       # Card components
│   │   ├── dashboard/   # Dashboard components
│   │   ├── dialogs/     # Dialog components
│   │   ├── forms/       # Form components
│   │   └── ui/          # Base UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions & API clients
│   ├── store/           # Zustand store & slices
│   └── types/           # TypeScript types
├── prisma/              # Database schema & migrations
└── public/              # Static assets
```

## Core Components

### UI Components
- **BaseCard**: Reusable card component with variants
- **DashboardLayout**: Main dashboard interface
- **FormDialog**: Reusable form dialog system 
- **Timeline**: Activity timeline visualization
- **CardViewControls**: Grid/list view toggle controls

### Forms & Dialogs
- **QuickAdd**: Rapid data entry dialogs
- **FormField**: Reusable form field components
- **Validation**: Built-in form validation

### Data Management
- **Store Slices**: Modular state management
- **API Clients**: Type-safe API integration
- **Hooks**: Custom hooks for data operations

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- PostgreSQL database
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/projman3-webui.git
cd projman3-webui
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure environment:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your database credentials.

4. Initialize database:
```bash
pnpm prisma generate
pnpm prisma db push
```

5. Start development server:
```bash
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## Development

### Code Style
- Follow TypeScript best practices
- Use functional components
- Implement proper error handling
- Write clean, documented code

### Component Guidelines
- Use TypeScript interfaces
- Implement proper prop validation
- Follow the component hierarchy
- Maintain single responsibility

### State Management
- Use Zustand for global state
- Implement proper selectors
- Handle loading and error states
- Use local state when appropriate

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support, email support@example.com or open an issue in the repository.
