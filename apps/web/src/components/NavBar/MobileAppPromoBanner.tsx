import { ReactComponent as Logo } from 'assets/svg/logo.svg'
import Column from 'components/Column'
import Row from 'components/Row'
import { useEthersWeb3Provider } from 'hooks/useEthersProvider'
import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { useState } from 'react'
import { X } from 'react-feather'
import { Trans } from 'react-i18next'
import { hideMobileAppPromoBannerAtom } from 'state/application/atoms'
import styled, { useTheme } from 'styled-components'
import { BREAKPOINTS } from 'theme'
import { ThemedText } from 'theme/components'
import { Z_INDEX } from 'theme/zIndex'
import { isWebAndroid, isWebIOS } from 'uniswap/src/utils/platform'
import { getWalletMeta } from 'utils/walletMeta'

const Wrapper = styled.div`
  height: 56px;
  width: 100%;
  background-color: ${({ theme }) => theme.accent2};
  padding: 10px 16px 10px 12px;
  z-index: ${Z_INDEX.sticky};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  display: none;
  @media screen and (max-width: ${BREAKPOINTS.sm}px) {
    display: flex;
  }
`

const StyledButton = styled.a`
  height: 28px;
  background: ${({ theme }) => theme.accent1};
  border-radius: 16px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`

/**
 * We show the mobile app promo banner if:
 * - The user is on a mobile device our app supports
 * - The user is not using Safari (since we don't want to conflict with the Safari-native Smart App Banner)
 * - The user has not dismissed the banner during this session
 */
export function useMobileAppPromoBannerEligible() {
  const hideMobileAppPromoBanner = useAtomValue(hideMobileAppPromoBannerAtom)
  return (isWebIOS || isWebAndroid) && !hideMobileAppPromoBanner
}

const UNIVERSAL_DOWNLOAD_LINK = 'https://x.com/DogeSwap_'

function getDownloadLink(userAgent: string, peerWalletAgent?: string): string {
  if (userAgent.includes('MetaMaskMobile')) {
    return 'https://x.com/DogeSwap_'
  }
  if (userAgent.includes('Phantom')) {
    return 'https://x.com/DogeSwap_'
  }
  if (userAgent.includes('OKApp')) {
    return 'https://x.com/DogeSwap_'
  }
  if (userAgent.includes('BitKeep')) {
    return 'https://x.com/DogeSwap_'
  }
  if (userAgent.includes('DeFiWallet')) {
    return 'https://x.com/DogeSwap_'
  }
  if (userAgent.includes('1inchWallet')) {
    return 'https://x.com/DogeSwap_'
  }
  if (userAgent.includes('RHNCW')) {
    return 'https://x.com/DogeSwap_'
  }
  if (peerWalletAgent?.includes('CoinbaseWallet CoinbaseBrowser')) {
    return 'https://x.com/DogeSwap_'
  }
  return UNIVERSAL_DOWNLOAD_LINK
}

export function MobileAppPromoBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const theme = useTheme()
  const mobileAppPromoBannerEligible = useMobileAppPromoBannerEligible()
  const [, setHideMobileAppPromoBanner] = useAtom(hideMobileAppPromoBannerAtom)

  const provider = useEthersWeb3Provider()

  const peerWalletAgent = provider ? getWalletMeta(provider)?.agent : undefined

  if (!mobileAppPromoBannerEligible || !isVisible) {
    return null
  }

  return (
    <Wrapper>
      <Row gap="sm">
        <X
          data-testid="mobile-promo-banner-close-button"
          size={20}
          color={theme.neutral2}
          onClick={() => {
            setIsVisible(false)
            setHideMobileAppPromoBanner(true)
          }}
        />
        <Logo width="32px" height="32px" />
        <Column>
          <ThemedText.BodySmall>
            <Trans>Follow the Community</Trans>
          </ThemedText.BodySmall>
          <ThemedText.Caption color="neutral2">
            <Trans>& Keep Updated</Trans>
          </ThemedText.Caption>
        </Column>
      </Row>
      <StyledButton href={getDownloadLink(navigator.userAgent, peerWalletAgent)}>
        <ThemedText.LabelSmall color="white" lineHeight="20px">
          <Trans>Follow Dogeswap</Trans>
        </ThemedText.LabelSmall>
      </StyledButton>
    </Wrapper>
  )
}
