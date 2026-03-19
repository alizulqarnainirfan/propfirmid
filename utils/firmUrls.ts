// Official URLs for prop firms
export const firmUrls: { [key: string]: string } = {
  // Popular Prop Firms
  'fxify': 'https://fxify.com/',
  'the5ers': 'https://the5ers.com/',
  'the-5ers': 'https://the5ers.com/',
  'ftmo': 'https://ftmo.com/',
  'myfundedfx': 'https://myfundedfx.com/',
  'my-funded-fx': 'https://myfundedfx.com/',
  'fundedtrading': 'https://fundedtrading.com/',
  'funded-trading': 'https://fundedtrading.com/',
  'topsteptrader': 'https://www.topsteptrader.com/',
  'topstep': 'https://www.topsteptrader.com/',
  'apex-trader-funding': 'https://apextraderfunding.com/',
  'apextraderfunding': 'https://apextraderfunding.com/',
  'surge-trader': 'https://surgetrader.com/',
  'surgetrader': 'https://surgetrader.com/',
  'e8-funding': 'https://e8funding.com/',
  'e8funding': 'https://e8funding.com/',
  'lark-funding': 'https://larkfunding.com/',
  'larkfunding': 'https://larkfunding.com/',
  'blue-guardian': 'https://blueguardian.com/',
  'blueguardian': 'https://blueguardian.com/',
  'funding-pips': 'https://fundingpips.com/',
  'fundingpips': 'https://fundingpips.com/',
  'dna-funded': 'https://dnafunded.com/',
  'dnafunded': 'https://dnafunded.com/',
  'alpha-capital-group': 'https://alphacapitalgroup.uk/',
  'alphacapitalgroup': 'https://alphacapitalgroup.uk/',
  'maven-trading': 'https://maventrading.com/',
  'maventrading': 'https://maventrading.com/',
  'thinkcapital': 'https://thinkcapital.com/',
  'think-capital': 'https://thinkcapital.com/',
  'eightcap-challenges': 'https://eightcap.com/challenges/',
  'eightcap': 'https://eightcap.com/challenges/',
  'my-crypto-funding': 'https://mycryptofunding.org/',
  'mycryptofunding': 'https://mycryptofunding.org/',
  'atfunded': 'https://atfunded.com/',
  'at-funded': 'https://atfunded.com/',
  'thaurus-guru': 'https://thaurusguru.com/',
  'thaurusguru': 'https://thaurusguru.com/',
  'blueberry-funded': 'https://blueberryfunded.com/',
  'blueberryfunded': 'https://blueberryfunded.com/',
  'instant-funding': 'https://instantfunding.com/',
  'instantfunding': 'https://instantfunding.com/',
  'funded-next': 'https://fundednext.com/',
  'fundednext': 'https://fundednext.com/',
  'prop-firm': 'https://propfirm.com/',
  'propfirm': 'https://propfirm.com/',
  'city-traders-imperium': 'https://citytraders.com/',
  'citytraders': 'https://citytraders.com/',
  'smart-prop-trader': 'https://smartproptrader.com/',
  'smartproptrader': 'https://smartproptrader.com/',
  'goat-funded-trader': 'https://goatfundedtrader.com/',
  'goatfundedtrader': 'https://goatfundedtrader.com/',
  'funded-trading-plus': 'https://fundedtradingplus.com/',
  'fundedtradingplus': 'https://fundedtradingplus.com/',
  'the-funded-trader': 'https://thefundedtrader.com/',
  'thefundedtrader': 'https://thefundedtrader.com/',
  'one-up-trader': 'https://oneuptrader.com/',
  'oneuptrader': 'https://oneuptrader.com/',
  'traders-central': 'https://traderscentral.com/',
  'traderscentral': 'https://traderscentral.com/',
  'audacity-capital': 'https://audacitycapital.co.uk/',
  'audacitycapital': 'https://audacitycapital.co.uk/',
  'nova-funding': 'https://novafunding.com/',
  'novafunding': 'https://novafunding.com/',
  'breakout-prop': 'https://breakoutprop.com/',
  'breakoutprop': 'https://breakoutprop.com/',
  'skilled-funded-trader': 'https://skilledfundedtrader.com/',
  'skilledfundedtrader': 'https://skilledfundedtrader.com/',
  'true-forex-funds': 'https://trueforexfunds.com/',
  'trueforexfunds': 'https://trueforexfunds.com/',
  'phoenix-funding': 'https://phoenixfunding.com/',
  'phoenixfunding': 'https://phoenixfunding.com/',
  'elite-trader-funding': 'https://elitetraderfunding.com/',
  'elitetraderfunding': 'https://elitetraderfunding.com/',
  'funded-engineer': 'https://fundedengineer.com/',
  'fundedengineer': 'https://fundedengineer.com/',
  'prop-trading-tech': 'https://proptradingtech.com/',
  'proptradingtech': 'https://proptradingtech.com/',
  'the-trading-pit': 'https://thetradingpit.com/',
  'thetradingpit': 'https://thetradingpit.com/',
  'funded-account-plus': 'https://fundedaccountplus.com/',
  'fundedaccountplus': 'https://fundedaccountplus.com/',
  'traders-with-edge': 'https://traderswithedge.com/',
  'traderswithedge': 'https://traderswithedge.com/',
  'prop-capital': 'https://propcapital.com/',
  'propcapital': 'https://propcapital.com/',
  'funded-trader-global': 'https://fundedtraderglobal.com/',
  'fundedtraderglobal': 'https://fundedtraderglobal.com/',
  'the-prop-trading-company': 'https://theproptradingcompany.com/',
  'theproptradingcompany': 'https://theproptradingcompany.com/',
}

// Function to get firm URL by name
export function getFirmUrl(firmName: string): string {
  const normalizedName = firmName.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
  
  // Try different variations
  const variations = [
    normalizedName,
    normalizedName.replace(/-/g, ''),
    firmName.toLowerCase().replace(/\s+/g, ''),
    firmName.toLowerCase()
  ]
  
  for (const variation of variations) {
    if (firmUrls[variation]) {
      return firmUrls[variation]
    }
  }
  
  // Fallback to a generic URL or return empty string
  return ''
}

// Function to check if firm has official URL
export function hasFirmUrl(firmName: string): boolean {
  return getFirmUrl(firmName) !== ''
}