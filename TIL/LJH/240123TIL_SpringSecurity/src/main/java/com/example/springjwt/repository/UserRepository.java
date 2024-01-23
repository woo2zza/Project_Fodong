package com.example.springjwt.repository;

import com.example.springjwt.dto.JoinDTO;
import com.example.springjwt.entity.UserEntity;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {
//    Boolean existsByUsername(String username);
    void insertUser(UserEntity user);

    boolean existsByUsername(String username);

    UserEntity findByUsername(String username);


    // 아래 코드를 Repository에 추가

    // mapper를 호출하는 방식
// 회원가입
//    void insertUser(JoinDTO joinDTO);

    // mapper를 호출하지 않고 여기서 쿼리까지 수행하는 방식
// 아래같이 코드를 작성하면 mapper에 내용을 추가하지 않아도 됨
// 사용하고자 하는 쿼리 종류(insert, select 등)에 맞춰 어노테이션을 붙여야함
//    @Insert("insert into member_table(member_email, member_password, member_name) values(#{member_email}, #{member_password}, #{member_name})")
//    void save2(JoinDTO joinDTO);
}
//import org.springframework.data.jpa.repository.JpaRepository;

//public interface UserRepository extends JpaRepository<UserEntity, Integer> {
//
//    Boolean existsByUsername(String username);
//
//    // username을 받아 DB 테이블에서 회원을 조회하는 메서드
//    UserEntity findByUsername(String username);
//}
