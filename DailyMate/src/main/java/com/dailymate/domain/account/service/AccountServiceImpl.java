package com.dailymate.domain.account.service;

import com.dailymate.domain.account.constant.AccountType;
import com.dailymate.domain.account.constant.Category;
import com.dailymate.domain.account.dao.AccountRepository;
import com.dailymate.domain.account.domain.Account;
import com.dailymate.domain.account.dto.AccountReqDto;
import com.dailymate.domain.account.dto.AccountResDto;
import com.dailymate.domain.account.exception.AccountExceptionMessage;
import com.dailymate.domain.account.exception.AccountNotFountException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    /**
     * 가계부 등록
     * @param dto
     */
    @Override
    public void addAccount(AccountReqDto dto) {
        log.info("[가계부 등록] 가계부 등록 요청");

        int amount = dto.getAmount();
        String category = dto.getCategory();

        // UserId 추가해야함
        Account account = Account.builder()
                .content(dto.getContent())
                .type(AccountType.getType(amount))
                .amount(amount)
                .category(Category.getCategory(category))
//                .date(LocalDate.parse(dto.getDate(), DateTimeFormatter.ISO_DATE))
                .date(dto.getDate())
                .build();

        accountRepository.save(account);

        log.info("[가계부 등록] 가계부 등록 완료");
    }

    @Transactional
    @Override
    public AccountResDto updateAccount(Long accountId, AccountReqDto dto) {
        log.info("[가계부 수정] 가계부 수정 요청. accountId : {}", accountId);

        // 1. 존재하는 가계부인지 체크
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> {
                    log.error("[가계부 수정] 존재하지 않는 가계부입니다.");
                    return new AccountNotFountException("[UPDATE_ACCOUNT] " + AccountExceptionMessage.ACCOUNT_NOT_FOUND.getMsg());
                });

        // 2. 이미 삭제된 가계부인지 체크
        if(account.getDeletedAt() != null) {
            log.error("[가계부 수정] 이미 삭제된 가계부입니다.");
            throw new AccountNotFountException("[UPDATE_ACCOUNT] " + AccountExceptionMessage.ACCOUNT_NOT_FOUND.getMsg());
        }

        // 3. 로그인 사용자의 가계부인지 체크(추후 추가)



        log.info("[가계부 수정] 가계부 찾기 완료.");
//        account.updateAccount(dto.getContent(), dto.getDate() == null ? null : LocalDate.parse(dto.getDate(), DateTimeFormatter.ISO_DATE), dto.getAmount(), Category.getCategory(dto.getCategory()));
        account.updateAccount(dto.getContent(), dto.getDate(), dto.getAmount(), Category.getCategory(dto.getCategory()));

//        log.info("accountId : {}", account.getAccountId());
//        log.info("userId : {}", account.getUserId());
//        log.info("content : {}", account.getContent());
//        log.info("type : {}", account.getType());
//        log.info("date : {}", account.getDate());
//        log.info("amount : {}", account.getAmount());
//        log.info("category : {}", account.getCategory());
//        log.info("createdAt : {}", account.getCreatedAt());
//        log.info("updatedAt : {}", account.getUpdatedAt());
//        log.info("deletedAt : {}", account.getDeletedAt());

//        accountRepository.save(account); // 얘 필요없는지 체크 -> 없어도 되는듯

        log.info("[가계부 수정] 가계부 수정 완료.");
        return AccountResDto.entityToDto(account);
    }

    @Transactional
    @Override
    public void deleteAccount(Long accountId) {
        log.info("[가계부 삭제] 가계부 삭제 요청. accountId : {}", accountId);

        // 1. 존재하면 가계부인지 체크
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> {
                    log.error("[가계부 삭제] 존재하지 않는 가계부입니다.");
                    return new AccountNotFountException("[DELETE_ACCOUNT] " + AccountExceptionMessage.ACCOUNT_NOT_FOUND.getMsg());
                });

        // 2. 기삭제된 가계부인지 체크
        if(account.getDeletedAt() != null) {
            log.error("[가계부 삭제] 기삭제된 가계부입니다.");
            throw new AccountNotFountException("[DELETE_ACCOUNT] " + AccountExceptionMessage.ACCOUNT_NOT_FOUND.getMsg());
        }

        // 3. 로그인 사용자의 가계부인지 체크

        log.info("[가계부 삭제] 가계부 찾기 완료.");
        account.delete();
//        accountRepository.save(account);

        log.info("[가계부 삭제] 가계부 삭제 완료.");
    }



}
