# Smart Electricity Consumption and Outage Notification System

Academic final-year project prototype for Adventist University of Central Africa (AUCA), using Rwanda Energy Group (REG) as a case study.

## Prototype scope

This React application uses fictional customers, meters, purchases, readings, network sections, outages, and notification events. It is not connected to REG infrastructure and does not provide live meter readings, real vending, production authentication, or actual SMS/email delivery.

Changes are stored in the browser for the demo session. An administrator can restore the seeded dataset with **Reset demo data**.

## Demo access

Open the application and choose an account from the **Demo account** selector. The password field accepts the prefilled demonstration password.

| Role | Demo account |
| --- | --- |
| Prepaid Customer | Assoumpta Uwineza |
| Outage Operations | Patrick Habimana |
| Customer Service | Diane Mukamana |
| Service Area Staff | Samuel Rukundo — Gasabo |
| System Administrator | Jean Nshimiyimana |
| REG Management | Aline Ingabire |

## Suggested review scenarios

1. **Customer purchase:** Sign in as Assoumpta, record a simulated purchase, and confirm the balance, prediction, purchase history, and notification center update.
2. **Meter verification:** Submit a meter-linking request as a customer, then approve it using the Customer Service account.
3. **Prediction:** Open **Prediction**, review the transparent balance ÷ average-consumption calculation, and configure warning thresholds.
4. **Outage targeting:** Sign in as Operations, open the four-step scheduling wizard, select a feeder, and inspect the included/excluded customer preview.
5. **Outage lifecycle:** Publish, update, cancel, or restore a simulated outage and inspect versioned notices and audit entries.
6. **Area restriction:** Sign in as Samuel Rukundo to review only fictional Gasabo network and outage information.
7. **Permissions:** Sign in as Administrator to review the permission matrix, user management, settings, and audit log.
8. **Reporting:** Sign in as Management, change report filters, generate a report, and export the filtered CSV.

## Data and privacy boundary

- All identities and meter numbers are fictional.
- Network mappings are illustrative and do not describe REG's operational network.
- Balance and run-out predictions are estimates derived from simulated records.
- SMS and email labels represent simulated channels only.
- No payments, tokens, messages, or external integrations are executed.

## Local commands

The Figma Make development server is managed by the environment.

```sh
pnpm exec tsc --noEmit
pnpm build
```
