import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("ErrorBoundary caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="p-6 text-center">
            <h2 className="text-lg font-semibold">
              Something went wrong!
            </h2>
            <p className="text-muted-foreground">
              Please refresh the page.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
