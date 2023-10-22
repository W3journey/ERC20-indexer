import { Button } from "@/components/ui/button"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Image from "next/image"
import { LuChevronDown } from "react-icons/lu"

interface CustomConnectButtonProps {
  label?: string
  showBalance?: boolean
  chainStatus?: "full" | "icon" | "name" | "none"
}

export const CustomConnectButton: React.FC<CustomConnectButtonProps> = ({
  label = "Connect Wallet",
  showBalance = true,
  chainStatus = "full",
}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading"
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated")

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    type="button"
                    className="font-semibold bg-blue-500"
                  >
                    {label}
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    type="button"
                    className="font-semibold bg-red-500"
                  >
                    Wrong network
                  </Button>
                )
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  {chainStatus !== "none" && (
                    <Button
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                      type="button"
                      className="gap-1 font-semibold"
                    >
                      {chain.hasIcon && chainStatus !== "name" && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              src={chain.iconUrl}
                              alt={chain.name ?? "Chain icon"}
                              width={12}
                              height={12}
                            />
                          )}
                        </div>
                      )}
                      {chainStatus !== "icon" && chain.name}
                      <LuChevronDown />
                    </Button>
                  )}

                  <Button
                    onClick={openAccountModal}
                    type="button"
                    className="gap-1 font-semibold"
                  >
                    {account.displayName}
                    {showBalance && account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                    <LuChevronDown />
                  </Button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
