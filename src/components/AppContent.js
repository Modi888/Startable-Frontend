import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import routes from '../routes'

const AppContent = () => {
    return (
        <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
                <Switch>
                    {routes.map((route) =>
                            route.component && (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={(props) => <route.component {...props} />}
                                />
                            )
                    )}
                </Switch>
            </Suspense>
        </CContainer>
    )
}

export default React.memo(AppContent)
