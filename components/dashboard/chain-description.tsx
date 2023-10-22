"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

interface ChainDescriptionProps {
  className?: string
  name?: string
  description?: string
}
const ChainDescription: React.FC<ChainDescriptionProps> = ({
  className,
  name,
  description,
}) => {
  const [open, setOpen] = useState(false)

  const splitDescription = () => {
    if (description) {
      const formattedDescription = description.replaceAll(";", ",")
      const firstIndex = formattedDescription.indexOf(".")
      const secondIndex = formattedDescription.indexOf(".", firstIndex + 1)
      const firstParagraph = formattedDescription.slice(0, secondIndex + 1)
      const lastParagraph = formattedDescription.slice(
        secondIndex + 1,
        formattedDescription.length
      )

      return [firstParagraph, lastParagraph]
    }
  }

  const testDescription = splitDescription()

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-center">What is {name}?</CardTitle>
      </CardHeader>
      <CardContent className="px-12 pb-12">
        <Collapsible open={open} onOpenChange={setOpen}>
          <p className="leading-7 mt-6 ">
            {testDescription && testDescription[0]}
          </p>
          <CollapsibleContent>
            <p className="leading-7 ">
              {testDescription && testDescription[1]}
            </p>
          </CollapsibleContent>
          <div className="w-full flex items-center justify-center pt-12">
            <CollapsibleTrigger asChild>
              <Button variant={"secondary"}>
                <div className="flex flex-col items-center">
                  Read {!open ? "More" : "Less"}
                </div>
              </Button>
            </CollapsibleTrigger>
          </div>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
export default ChainDescription
