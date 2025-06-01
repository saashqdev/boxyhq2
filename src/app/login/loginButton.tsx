import { Button } from "@/components/ui/button"

export default function LoginButton(
  { disabled }: { disabled: boolean } = { disabled: false },
) {

  return (
    <div className="mt-4 w-full">
      <Button type="submit" disabled={disabled}>
        Sign-in
      </Button>
    </div>
  );
}
