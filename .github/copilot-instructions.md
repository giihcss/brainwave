<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# BrainWave Next.js Project Guidelines

This is a modern Next.js project with TypeScript, TailwindCSS, and ESLint. Follow these guidelines when generating code:

## General
- Use TypeScript for type safety
- Follow React best practices and hooks
- Implement responsive design with TailwindCSS
- Focus on accessibility (WCAG guidelines)
- Write clean, maintainable code with proper comments

## Components
- Use functional components with TypeScript
- Implement proper prop types
- Follow atomic design principles
- Ensure components are responsive and accessible
- Use TailwindCSS for styling

## State Management
- Use React Context for global state when needed
- Implement proper data fetching with Next.js features
- Handle loading and error states appropriately

## Accessibility
- Include proper ARIA labels
- Ensure keyboard navigation
- Maintain proper color contrast
- Support screen readers
- Handle focus management

## Performance
- Optimize images using Next.js Image component
- Implement proper code splitting
- Use proper caching strategies
- Optimize for Core Web Vitals

## Project Structure
Follow this structure when creating new files:
- /src
  - /app - App Router pages and layouts
  - /components - Reusable components
  - /lib - Utility functions and hooks
  - /services - API and external service integrations
  - /types - TypeScript type definitions
  - /styles - Global styles and TailwindCSS configurations
