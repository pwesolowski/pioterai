import { DocumentFlow } from "./document-flow"
import { McpChat } from "./mcp-chat"

const visuals: Record<string, () => React.ReactElement> = {
  "document-flow": DocumentFlow,
  "mcp-chat": McpChat,
}

/** Ilustracja wybierana polem `visual` we frontmatterze case study */
export function CaseVisual({ name }: { name?: string }) {
  const Visual = name ? visuals[name] : undefined
  return Visual ? <Visual /> : null
}
