package com.bjpowernode.crm.commons.utils;

import java.util.UUID;

/**
 * 返回uuid的值
 */
public class UUIDUtils {
    public static String getUUID(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }
}
