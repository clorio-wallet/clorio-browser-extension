import * as React from "react";
import { AlertTriangle, Eye, EyeOff, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";

interface SeedPhraseDisplayProps {
  words: string[];
  onAcknowledge?: () => void;
}

export function SeedPhraseDisplay({ words, onAcknowledge }: SeedPhraseDisplayProps) {
  const [acknowledged, setAcknowledged] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(words.join(" "));
    setCopied(true);
    // Auto-clear clipboard after 60s (security)
    setTimeout(() => {
      navigator.clipboard.writeText("").catch(() => {});
      setCopied(false);
    }, 60000);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!acknowledged) {
    return (
      <Card className="border-warning/50 bg-warning/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-warning">
            <AlertTriangle className="h-5 w-5" />
            Security Warning
          </CardTitle>
          <CardDescription>
            Read carefully before proceeding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm">
            {[
              "Never share your seed phrase with anyone",
              "Never enter it on any website or app",
              "Store it offline in a secure location",
              "Anyone with these words can steal your funds",
              "We will never ask for your seed phrase",
            ].map((warning, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                <span>{warning}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() => {
              setAcknowledged(true);
              onAcknowledge?.();
            }}
            className="w-full"
          >
            I understand, show my seed phrase
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Your Seed Phrase</CardTitle>
        <CardDescription>
          Write these {words.length} words down in order and store them safely
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Word Grid */}
        <div
          className={cn(
            "grid grid-cols-3 gap-2 p-4 bg-muted rounded-lg transition-all duration-200",
            !revealed && "blur-md select-none pointer-events-none"
          )}
          onCopy={(e) => !revealed && e.preventDefault()}
        >
          {words.map((word, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-background rounded-md"
            >
              <span className="text-xs text-muted-foreground w-5 text-right tabular-nums">
                {index + 1}.
              </span>
              <span className="font-mono text-sm">{word}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setRevealed(!revealed)}
            className="flex-1"
          >
            {revealed ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Reveal
              </>
            )}
          </Button>

          {revealed && (
            <Button
              variant="outline"
              onClick={handleCopy}
              className="flex-1"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-success" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          )}
        </div>

        {revealed && (
          <p className="text-xs text-muted-foreground text-center">
            Clipboard will auto-clear in 60 seconds for security
          </p>
        )}
      </CardContent>
    </Card>
  );
}
