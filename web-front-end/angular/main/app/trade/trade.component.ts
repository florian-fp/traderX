import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { TradeTicket } from '../model/trade.model';
import { Account } from '../model/account.model';
import { AccountService } from '../service/account.service';
import { Stock } from '../model/symbol.model';
import { SymbolService } from '../service/symbols.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularVoiceTradeService } from '../service/voice-trade.service';
import { VoiceCommand } from '../../../shared/voice-service';

@Component({
    selector: 'app-trade',
    templateUrl: './trade.component.html',
    styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {
    accounts: Account[] = [];
    accountModel?: Account = undefined;
    stocks: Stock[] = [];
    modalRef?: BsModalRef;
    createTicketResponse: any;
    private account = new Subject<Account>();
    isVoiceListening = false;
    voiceCommand: string = '';
    voiceError: string = '';

    constructor(private accountService: AccountService,
        private symbolService: SymbolService,
        private modalService: BsModalService,
        private voiceTradeService: AngularVoiceTradeService) { }

    ngOnInit(): void {
        this.accountService.getAccounts().subscribe((accounts) => {
            this.accounts = accounts;
            this.setAccount(this.accounts[5]);
            console.log(this.accounts);
        });
        this.symbolService.getStocks().subscribe((stocks) => this.stocks = stocks);
    }

    onAccountChange(account: Account) {
        console.log('onAccountChange', arguments);
        account && this.setAccount(account);
    }

    getAccountName(item: Account) {
        return item.displayName;
    }

    openTicket(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    createTradeTicket(ticket: TradeTicket) {
        console.log('createTradeTicket', ticket);
        this.symbolService.createTicket(ticket).subscribe((response) => {
            console.log(response);
            this.createTicketResponse = response;
        });
        this.closeTicket();
    }

    closeTicket() {
        this.modalRef?.hide();
    }

    onCloseAlert() {
        this.createTicketResponse = undefined;
    }

    private setAccount(account: Account) {
        this.accountModel = account;
        this.account.next(account);
    }

    async startVoiceCommand() {
        if (!this.voiceTradeService.isVoiceEnabled()) {
            this.voiceError = 'Voice functionality is not enabled';
            return;
        }

        if (!this.accountModel) {
            this.voiceError = 'Please select an account first';
            return;
        }

        try {
            this.isVoiceListening = true;
            this.voiceError = '';
            this.voiceCommand = '';

            await this.voiceTradeService.provideFeedback('Listening for your trade command');
            
            const command: VoiceCommand = await this.voiceTradeService.captureVoiceCommand();
            
            this.voiceCommand = `${command.action} ${command.quantity} shares of ${command.security}`;
            
            const ticket: TradeTicket = {
                accountId: this.accountModel.id,
                security: command.security,
                side: command.action === 'buy' ? 'Buy' : 'Sell',
                quantity: command.quantity
            };

            await this.voiceTradeService.provideFeedback(
                `Confirming ${command.action} order for ${command.quantity} shares of ${command.security}`
            );

            this.createTradeTicket(ticket);

        } catch (error: any) {
            this.voiceError = error.message || 'Voice command failed';
            await this.voiceTradeService.provideFeedback('Voice command failed. Please try again.');
        } finally {
            this.isVoiceListening = false;
        }
    }

    stopVoiceCommand() {
        this.voiceTradeService.stopListening();
        this.isVoiceListening = false;
    }

    isVoiceSupported(): boolean {
        return this.voiceTradeService.isVoiceEnabled();
    }
}
