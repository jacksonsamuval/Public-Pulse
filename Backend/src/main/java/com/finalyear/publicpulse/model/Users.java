package com.finalyear.publicpulse.model;

import jakarta.persistence.*;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String name;
    private String age;
    private String mobileNo;
    private String address;
    private String PinCode;
    private String city;
    private String taluk;
    private String district;
    private String state;
    private String country;
    private String email;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Roles role;
    private String password;
    private Long totProblemsReported;
    private Long totalProblemAttempted;
    private Long totProblemSolved;
    private Long totPoints;

    public Long getTotProblemsReported() {
        return totProblemsReported;
    }

    public void setTotProblemsReported(Long totProblemsReported) {
        this.totProblemsReported = totProblemsReported;
    }

    public Long getTotalProblemAttempted() {
        return totalProblemAttempted;
    }

    public void setTotalProblemAttempted(Long totalProblemAttempted) {
        this.totalProblemAttempted = totalProblemAttempted;
    }

    public Long getTotPoints() {
        return totPoints;
    }

    public void setTotPoints(Long totPoints) {
        this.totPoints = totPoints;
    }

    public Long getTotProblemSolved() {
        return totProblemSolved;
    }

    public void setTotProblemSolved(Long totProblemSolved) {
        this.totProblemSolved = totProblemSolved;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPinCode() {
        return PinCode;
    }

    public void setPinCode(String pinCode) {
        PinCode = pinCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getTaluk() {
        return taluk;
    }

    public void setTaluk(String taluk) {
        this.taluk = taluk;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }
}
