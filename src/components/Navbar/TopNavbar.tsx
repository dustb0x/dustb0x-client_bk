import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { DEFAULT_META } from '@/config/constants/meta'
import { connector } from '@/utils/connector'

import {
  Button,
  Dropdown,
  Grid,
  Navbar,
  Modal,
  Text
} from '@nextui-org/react'

import { SettingIcon } from '@/components/SettingIcon'

const TopNavbar = () => {
  const { account, active, activate, deactivate } = useWeb3React()
  const [myWalletModal, setMyWalletModal] = useState<boolean>(false)

  const connectWallet = () => {
    activate(connector.injected)
  }

  const disconnectWallet = () => {
    deactivate()
  }

  return (
    <>
      <Navbar>
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            {DEFAULT_META.title}
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Item id="connect-wallet-button">
            {!active ? (
              <Button
                auto
                rounded
                color="gradient"
                size="sm"
                onClick={() => connectWallet()}
              >
                Connect Wallet
              </Button>
            ) : (
              <Dropdown placement="bottom-right">
                <Navbar.Item>
                  <Dropdown.Trigger>
                    <Button
                      auto
                      light
                      icon={<SettingIcon />}
                    />
                  </Dropdown.Trigger>
                </Navbar.Item>
                <Dropdown.Menu>
                  <Dropdown.Item key="may-wallet">
                    <Text onClick={() => setMyWalletModal(true)}>
                      My Wallet
                    </Text>
                  </Dropdown.Item>
                  <Dropdown.Item key="disconnect" withDivider color="error">
                    <Text color="error" onClick={() => {disconnectWallet()}}>
                        Disconnect
                    </Text>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <Modal
        open={myWalletModal}
        onClose={() => setMyWalletModal(false)}
        width="600px"
      >
        <Modal.Header>
        <Text size={18}>
          My wallet
        </Text>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container>
            <Grid xs={12} justify="center">
              <Text>
              {account}
            </Text>
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onClick={() => setMyWalletModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TopNavbar
