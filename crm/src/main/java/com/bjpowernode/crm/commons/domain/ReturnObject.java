package com.bjpowernode.crm.commons.domain;

public class ReturnObject {
    private String code;//处理成功失败的标记
    private String message;//提示信息
    private Object reData;//返回其他数据

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getReData() {
        return reData;
    }

    public void setReData(Object reData) {
        this.reData = reData;
    }
}
