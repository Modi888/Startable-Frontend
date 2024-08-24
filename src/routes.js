import React from 'react'


const Home = React.lazy(() => import('./views/home/index'))
const Launchpad = React.lazy(() => import('./views/launchpad/Home'))
const DefiLaunchPadInfo = React.lazy(() => import('./views/launchpad/DefiLaunchPadInfo'))
const AddAdditionalInfo = React.lazy(() => import('./views/launchpad/AddAdditionalInfo'))
const Review = React.lazy(() => import('./views/launchpad/Review'))
const FairHome = React.lazy(() => import('./views/fairlaunch/FairHome'))
const DefiFairLaunchInfo = React.lazy(() => import('./views/fairlaunch/DefiFairLaunchInfo'))
const FairAddAdditionalInfo = React.lazy(() => import('./views/fairlaunch/FairAddAdditionalInfo'))
const FairReview = React.lazy(() => import('./views/fairlaunch/FairReview'))
const TokenHome = React.lazy(() => import('./views/token/Home'))
const NoWalletHome = React.lazy(() => import('./views/token/NoWalletHome'))

const TokenSuccess = React.lazy(() => import('./views/token/Success'))
const LaunchpadList = React.lazy(() => import('./views/launchpadlist/Home'))
const FairPoolView = React.lazy(() => import('./views/FairPoolView'))
const NormalPoolView = React.lazy(() => import('./views/NormalPoolView'))
const Docs = React.lazy(() => import('./views/docs/index'))
const Team = React.lazy(() => import('./views/team/index'))
// const temp = React.lazy(() => import('./views/temp/temp'))


const routes = [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/launchpad', exact: true, name: 'Launchpad', component: Launchpad },
  { path: '/launchpad/home', exact: true, name: 'Launchpad', component: Launchpad },
  { path: '/launchpad/defi_launch_pad_info', exact: true, name: 'DefiLaunchPadInfo', component: DefiLaunchPadInfo },
  { path: '/launchpad/add_additional_info', exact: true, name: 'AddAdditionalInfo', component: AddAdditionalInfo},
  { path: '/launchpad/review', name: 'Review', exact: true, component: Review},
  { path: '/fairlaunch/home', name: 'FairHome', exact: true,  component: FairHome },
  { path: '/fairlaunch/defi_fair_launch_info', exact: true, name: 'DefiFairLaunchInfo',  component: DefiFairLaunchInfo },
  { path: '/fairlaunch/add_additional_info', exact: true, name: 'FairAddAdditionalInfo',  component: FairAddAdditionalInfo },
  { path: '/fairlaunch/review', exact: true, name: 'FairReview', component: FairReview },


  { path: '/createtoken/home', exact: true, name: 'CreateToken', component: window.ethereum ? TokenHome : NoWalletHome},


  { path: '/createToken/success', exact: true, name: 'SuccessTokenCreation', component: TokenSuccess},
  { path: '/launchpadlist', exact: true, name: 'LaunchPadList', component: LaunchpadList },
  { path: '/launchviewfair', exact: true, name: 'FairPoolView', component: FairPoolView},
  { path: '/launchviewnormal', exact: true, name: 'NormalPoolView', component: NormalPoolView},
  { path: '/docs', exact: true, name: 'Docs', component: Docs},
  { path: '/team', exact: true, name: 'Team', component: Team},

  // { path: '/temp', exact: true, name: 'temp', component: temp},
]

export default routes
